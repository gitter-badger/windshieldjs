Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.provision :shell, path: "vagrant-provision.sh"
  config.vm.network :forwarded_port, guest: 1337, host: 1337
  config.vm.network :forwarded_port, guest: 8888, host: 8888
  config.vm.synced_folder "../", "/var/opt"
  config.vm.synced_folder File.expand_path('~') + "/.vim", "/home/vagrant/.vim"
  config.vm.provision :file, source: File.expand_path('~') + "/.vimrc", destination: "/home/vagrant/.vimrc"
end
