FROM ubuntu:20.04

# Setup user
RUN useradd -ms /bin/bash sandbox 

# Setup working directory
WORKDIR /home/sandbox

# Update the ubuntu machine
RUN apt update && apt upgrade -y

# Install nano and curl
RUN apt install nano curl -y 

# Install nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && apt-get install -y nodejs

# Configure terminal
RUN echo "PS1='\w '" >> /home/sandbox/.bashrc

# Final working directory
WORKDIR /home/sandbox/app
