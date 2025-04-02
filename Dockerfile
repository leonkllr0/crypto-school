FROM php:8.4-cli

# Change current user to root
USER root

# Setting up arguments;
ARG NODE_VERSION=22

# Create user and group 'www'
RUN groupadd -g 1000 www && \
    useradd -u 1000 -ms /bin/bash -g www www

# Install base packages and Node.js
RUN apt-get update && apt-get install -y --no-install-recommends \
    unzip zip curl gnupg libzip-dev libicu-dev zlib1g-dev libxml2-dev libfreetype6-dev \
    libglib2.0-0 libnss3 libnspr4 libdbus-1-3 libatk1.0-0 libatk-bridge2.0-0 \
    libcups2 libx11-6 libxcomposite1 libxdamage1 libxext6 libxfixes3 libxrandr2 \
    libgbm1 libxcb1 libxkbcommon0 libpango-1.0-0 libcairo2 libasound2 libatspi2.0-0 \
  && curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - \
  && apt-get install -y nodejs \
  && docker-php-ext-install \
    bcmath ctype intl opcache pcntl pdo_mysql sockets zip \
  && pecl install openswoole redis \
  && docker-php-ext-enable openswoole redis \
  && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN npx playwright install chromium --with-deps

WORKDIR /app
COPY . /app

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Change current user to www
USER www
