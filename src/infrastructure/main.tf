terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0.2"
    }
  }

  required_version = ">= 1.1.0"
}

provider "azurerm" {
  features {

  }
}

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
    total_throughput_limit = 300
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