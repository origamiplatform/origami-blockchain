FROM hyperledger/composer-rest-server
RUN npm install --production loopback-connector-mongodb && \
npm cache clean --force && \
ln -s node_modules .node_modules