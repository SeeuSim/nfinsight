resource "azurerm_resource_group" "rm" {
  name     = "NFInsight"
  location = "southeastasia"
}

resource "azurerm_virtual_network" "nfetl_vnet" {
  name                = "nfetl-network"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.rm.location
  resource_group_name = azurerm_resource_group.rm.name
}

resource "azurerm_subnet" "nfetl_subnet" {
  name                 = "internal"
  resource_group_name  = azurerm_resource_group.rm.name
  virtual_network_name = azurerm_virtual_network.nfetl_vnet.name
  address_prefixes     = ["10.0.2.0/24"]
}

# Create public IPs
resource "azurerm_public_ip" "nfetl_pub_ip" {
  name                = "nf-ssh-ip"
  location            = azurerm_resource_group.rm.location
  resource_group_name = azurerm_resource_group.rm.name
  allocation_method   = "Dynamic"
}

# Create Network Security Group and rule
resource "azurerm_network_security_group" "nfetl_sg" {
  name                = "nfetl-network-sg"
  location            = azurerm_resource_group.rm.location
  resource_group_name = azurerm_resource_group.rm.name

  security_rule {
    name                       = "SSH"
    priority                   = 1001
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

resource "azurerm_network_interface" "nfetl_nic" {
  name                = "nfetl-nic"
  location            = azurerm_resource_group.rm.location
  resource_group_name = azurerm_resource_group.rm.name

  ip_configuration {
    name                          = "nfetl-nic-ipconfig"
    subnet_id                     = azurerm_subnet.nfetl_subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id = azurerm_public_ip.nfetl_pub_ip.id
  }
}

# Connect the security group to the network interface
resource "azurerm_network_interface_security_group_association" "nfetl_sg_association" {
  network_interface_id      = azurerm_network_interface.nfetl_nic.id
  network_security_group_id = azurerm_network_security_group.nfetl_sg.id
}

resource "tls_private_key" "nfetl_ssh" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "azurerm_linux_virtual_machine" "nfetl_vm" {
  name                = "nfetl-vm"
  resource_group_name = azurerm_resource_group.rm.name
  location            = azurerm_resource_group.rm.location
  size                = "Standard_B1s"
  admin_username      = "nf_vm_admin_user"
  network_interface_ids = [
    azurerm_network_interface.nfetl_nic.id
  ]

  admin_ssh_key {
    username   = "nf_vm_admin_user"
    public_key = tls_private_key.nfetl_ssh.public_key_openssh
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts-gen2"
    version   = "latest"
  }
}