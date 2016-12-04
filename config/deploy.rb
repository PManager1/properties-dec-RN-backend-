# config valid only for current version of Capistrano
lock '3.6.1'


set :application, "properties-dec"
set :repo_url,  "git@github.com:jpca999/properties-dec.git" 




# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, '/var/www/my_app_name'

set :deploy_to, "/home/ubuntu/properties-dec" 
set :use_sudo, true
# set :keep_releases, 2

# Default value for :scm is :git
set :scm, :git

# Default value for :format is :airbrussh.
set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
set :format_options, command_output: true, log_file: 'log/capistrano.log', color: :auto, truncate: :auto

# Default value for :pty is false
set :pty, true

# Default value for :linked_files is []
# append :linked_files, 'config/database.yml', 'config/secrets.yml'

# Default value for linked_dirs is []
# append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'public/system'

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
set :keep_releases, 1




# original copy.. 


set :scm, :git # You can set :scm explicitly or Capistrano will make an intelligent guess based on known version control directory names
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`


role :web, "34.192.106.66"                          # Your HTTP server, Apache/etc
role :app, "34.192.106.66"                          # This may be the same as your `Web` server
role :db,  "34.192.106.66", :primary => true # This is where Rails migrations will run
role :db,  "34.192.106.66"






set :deploy_via, :copy
set :copy_exclude, [".git", ".DS_Store"]



set :branch, "dev-2"


set :scm_username, "ubuntu" 
# set :scm_password, "Apple123$"

#set :runner, user 


set :user, "ubuntu"            
set :use_sudo, false
set :admin_runner, "user"



task :execute_on_server do
  on "root@34.192.106.66" do
    execute "npm install"
  end
end








# this tells capistrano what to do when you deploy
# namespace :deploy do

  # desc <<-DESC
  # A macro-task that updates the code and fixes the symlink.
  # DESC
  # task :default do
  #   transaction do
  #     update_code
  #     symlink
  #   end
  # end

  # task :update_code, :except => { :no_release => true } do
  #   on_rollback { run "rm -rf #{release_path}; true" }
  #   strategy.deploy!
  # end

  # task :after_deploy do
  #   cleanup
  # end

# end

# http://stackoverflow.com/questions/18838930/how-to-run-shell-commands-on-server-in-capistrano-v3

# task :execute_on_server do
#     execute "npm install"
# end	




# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, '/var/www/my_app_name'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: 'log/capistrano.log', color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, 'config/database.yml', 'config/secrets.yml'

# Default value for linked_dirs is []
# append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'public/system'

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5
