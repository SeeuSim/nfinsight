resource "azurerm_resource_group" "rm" {
  name     = "NFInsight"
  location = "southeastasia"
}

resource "azurerm_cosmosdb_account" "db" {
  name                = "nf-db"
  location            = azurerm_resource_group.rm.location
  resource_group_name = azurerm_resource_group.rm.name
  offer_type          = "Standard"
  enable_free_tier    = true

  capabilities {
    name = "EnableCassandra"
  }

  capacity {
    total_throughput_limit = 1000
  }

  backup {
    type                = "Periodic"
    interval_in_minutes = 240
    retention_in_hours  = 8
    storage_redundancy  = "Geo"
  }

  consistency_policy {
    consistency_level = "Strong"
  }

  geo_location {
    location          = azurerm_resource_group.rm.location
    failover_priority = 0
  }
}

resource "azurerm_cosmosdb_cassandra_keyspace" "kspc" {
  name = "nf-main-keyspace"
  resource_group_name = azurerm_resource_group.rm.name
  account_name = azurerm_cosmosdb_account.db.name
  throughput = 900
}

resource "azurerm_storage_account" "nf_storage" {
  name                     = "nfinsightstorage"
  resource_group_name      = azurerm_resource_group.rm.name
  location                 = azurerm_resource_group.rm.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  tags = {
    environment = "prod"
  }
}

resource "azurerm_storage_container" "nf_build_container" {
  name                  = "nfinsightcontainer"
  storage_account_name  = azurerm_storage_account.nf_storage.name
  container_access_type = "private"
}

module "vm" {
  source = "./vm"
}