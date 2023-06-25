output "public_ip_address" {
  value = azurerm_linux_virtual_machine.nfetl_vm.public_ip_address
}

output "tls_private_key" {
  value     = tls_private_key.nfetl_ssh.private_key_pem
  sensitive = true
}