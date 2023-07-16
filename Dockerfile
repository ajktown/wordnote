FROM node:18

COPY . .

# Delete .env.local file as FE itself is production ready
RUN rm -f .env.local

RUN yarn

RUN yarn build

EXPOSE 3000
ENTRYPOINT [ "yarn", "start" ]