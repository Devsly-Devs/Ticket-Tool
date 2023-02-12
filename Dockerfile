# Use the alpine image of node 16
FROM node:16-alpine

# Copy bot folder
COPY bot /bot

# install dependencies
WORKDIR /bot
RUN npm install


# Set the command
ENTRYPOINT ["node","bot.js"]