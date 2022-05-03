resource "digitalocean_kubernetes_cluster" "pegasus" {
	auto_upgrade = true
	name = "pegasus"
	region = var.region
	version = "1.22.8-do.1"

	maintenance_policy {
		day = "sunday"
		start_time = "00:00"
	}

	node_pool {
		name = "worker-pool"
		size = "s-1vcpu-2gb"
		node_count = 2
	}
}

data "digitalocean_kubernetes_cluster" "pegasus" {
	name = "pegasus"
}

resource "digitalocean_container_registry" "caprica" {
	name = "caprica"
	subscription_tier_slug = "starter"
}

data "digitalocean_container_registry" "caprica" {
	name = "caprica"
}

resource "digitalocean_container_registry_docker_credentials" "caprica_creds" {
	registry_name = "caprica"
}

resource "digitalocean_database_cluster" "ghost-db" {
	name = "ghost-db-cluster"
	engine = "mysql"
	node_count = 1
	region = "ams3"
	size = "db-s-1vcpu-1gb"
	version = "8"
}

provider "kubernetes" {
	host = data.digitalocean_kubernetes_cluster.pegasus.endpoint
	token = resource.digitalocean_kubernetes_cluster.pegasus.kube_config[0].token
	cluster_ca_certificate = base64decode(resource.digitalocean_kubernetes_cluster.pegasus.kube_config[0].cluster_ca_certificate)
}