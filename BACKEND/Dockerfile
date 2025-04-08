FROM ubuntu:20.04

# Create a non-root user
RUN useradd -ms /bin/bash sandbox

# Set working directory
WORKDIR /home/sandbox

# Update packages with retry logic and clean up
RUN apt-get update || apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    nano \
    curl \
    ca-certificates && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install latest Node.js (v22)
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set a basic prompt
RUN echo "PS1='\\w '" >> /home/sandbox/.bashrc

# Set app working dir
WORKDIR /home/sandbox/app

# Switch to non-root user
USER sandbox

# Default command
CMD ["/bin/bash"]