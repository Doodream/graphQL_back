const graphql = require("graphql");
const axios = require("axios");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        const data = axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then((res) => res.data);
        return data;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
// 쿼리를 루트 쿼리로 받아서 그래프 큐엘 스키마 객체로 반환합니다.
