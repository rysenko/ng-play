FROM node:0.12.7
COPY . .
RUN npm install
EXPOSE  3000
CMD ["node", "index.js"]
