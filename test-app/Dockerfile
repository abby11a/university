# Step 1: Build stage
FROM node:18-alpine3.16 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# Step 2: Run stage
FROM node:18-alpine3.16

WORKDIR /app

# Copy the build output to the new working directory
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
