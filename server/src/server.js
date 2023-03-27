const { ApolloServer, gql } = require('apollo-server');

// HackerNewsの1つ1つの投稿
let links = [
  {
    id: "link-0",
    description: "GraphQLチュートリアル",
    url: "www.udemy-graphql-tutorial.com"
  }
]

// GraphQLのスキーマ構造
const typeDefs = gql`
  // GET
  type Query {
    info: String!,
    feed: [Link]!
  }
  // POST
  type Mutation {
    post (url: String!, description: String!): Link!
  }

  type Link {
    id: ID!,
    description: String!,
    url: String!
  }
`;

// リゾルバ関数
const resolvers = {
  Query: {
    info: () => "HackerNewsクローン",
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});
server.listen()
  .then(({ url }) => {
    console.log(`${url}でサーバー起動`);
  });