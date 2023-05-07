# Azure Static Web App instance
resource "azurerm_static_site" "nfinsight" {
  name                = "nfinsight"
  resource_group_name = "main-rg"
  location            = "Southeast Asia"
  sku_size           = "Free"
  tags                = local.common_tags
}