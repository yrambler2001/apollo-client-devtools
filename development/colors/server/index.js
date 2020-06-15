const { ApolloServer, gql } = require('apollo-server');
const ColrAPI = require('./api/colr');
const ColormindAPI = require('./api/colormind');
const ColorAPI = require('./api/color');
const db = require('./db');

const typeDefs = gql`
  type Tag {
    id: ID
    name: String
  }

  type RandomColor {
    id: ID
    hex: String
    tags: [Tag]
  }

  type RandomScheme {
    result: [[Int]] 
  }

  type Random {
    id: ID
    color: RandomColor
    scheme: RandomScheme
  }

  type Hex {
    value: String!
  }

  type Rgb {
    value: String!
  }

  type Name {
    value: String!
  }

  type Contrast {
    value: String!
  }

  type Color {
    name: Name!
    hex: Hex!
    rgb: Rgb!
    contrast: Contrast!
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

  type Query {
    color(hex: String, rgb: String): Color
    random: Random
    scheme: Scheme
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
    scheme: async (_source, { hex, rgb }, { dataSources }) => {
      return dataSources.colorAPI.getColorScheme({ hex, rgb });
    },
    savedColors: async (_source, _, { dataSources }) => {
      return dataSources.db.get('favorites');
    },
  },
  Random: {
    color: async (_source, _, { dataSources }) => {
      return dataSources.colrAPI.getRandomColor();
    },
    scheme: async (_source, _, { dataSources }) => {
      return dataSources.colormindAPI.getRandomScheme();
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
    colrAPI: new ColrAPI(),
    colormindAPI: new ColormindAPI(),
    colorAPI: new ColorAPI(),
    db,
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});