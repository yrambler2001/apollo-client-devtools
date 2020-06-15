const { ApolloServer, gql } = require('apollo-server');
const ColorAPI = require('./api/color');
const db = require('./db');

const typeDefs = gql`
  type Color {
    name: String!
    hex: String!
    rgb: String!
    contrast: String!
  }

  enum Mode {
    MONOCHROME
    MONOCHROME_DARK
    MONOCHROME_LIGHT
    ANALOGIC
    COMPLEMENT
    ANALOGIC_COMPLEMENT
    TRIAD
    QUAD
  }

  type Scheme {
    mode: Mode!
    count: Int!
    colors: [Color]
  }

  type Random {
    color: Color
    scheme: Scheme
  }

  type Query {
    color(hex: String, rgb: String): Color
    random: Random
    scheme(hex: String, rgb: String, mode: Mode, count: Int): Scheme
    savedColors: [Color!]
  }

  type Mutation {
    saveColor(name: String!, hex: String!, rgb: String!): [Color!]!
  }
`;

const resolvers = {
  Mutation: {
    saveColor: async (_source, { name, hex, rgb }, { dataSources }) => {
      return dataSources.db.get('favorites')
        .push({ name: { value: name }, hex: { value: hex }, rgb: { value: rgb } })
        .write();
    },
  },
  Query: {
    random: () => ({}),
    color: async (_source, { hex, rgb }, { dataSources }) => {
      return dataSources.colorAPI.identifyColor({ hex, rgb });
    },
    scheme: async (_source, { hex, rgb, mode, count }, { dataSources }) => {
      return dataSources.colorAPI.getColorScheme({ hex, rgb, mode, count });
    },
    savedColors: async (_source, _, { dataSources }) => {
      return dataSources.db.get('favorites');
    },
  },
  Random: {
    color: async (_source, _, { dataSources }) => {
      return dataSources.colorAPI.getRandomColor();
    },
    scheme: async (_source, _, { dataSources }) => {
      return dataSources.colorAPI.getRandomScheme();
    },
  },
  Mode: {
    MONOCHROME: "monochrome",
    MONOCHROME_DARK: "monochrome-dark",
    MONOCHROME_LIGHT: "monochrome-light",
    ANALOGIC: "analogic",
    COMPLEMENT: "complement",
    ANALOGIC_COMPLEMENT: "analogic-complement",
    TRIAD: "triad",
    QUAD: "quad",  
  },
};

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  dataSources: () => ({
    colorAPI: new ColorAPI(),
    db,
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});