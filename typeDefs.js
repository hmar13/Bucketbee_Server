const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date

  type Bucket {
    id: ID!
    author: User
    members: [User]
    title: String
    notes: String
    date_created: String
    categories: [Category]
  }
  type Category {
    id: ID
    label: String
    places: [Place]
  }
  type Place {
    id: ID
    latitude: Float
    longitude: Float
    name: String
    rating: Float
    user_ratings_total: Int
    weekday_text: [String]
    open_now: Boolean
    description: String
    formatted_address: String
    international_phone_number: String
    imgArr: [String]
    url: String
    review: String
    notes: String
  }
  type User {
    id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    password: String
    birthday: String
    friends: [User]
    location: String
    vibe: String
    emojis: String
    profile_pic: String
    createdAt: Date
    updatedAt: Date
  }
  type Chat {
    id: ID
    name: String
    admin: ID
    members: [User]
    messages: [Message]
    createdAt: Date
    updatedAt: Date
  }
  type Message {
    id: ID
    chatId: ID
    description: String
    author: ID
    content: String
    timeslots: [String]
    photo: String
    createdAt: Date
    updatedAt: Date
  }
  input BucketInput {
    title: String
    notes: String
    category: String
  }
  input PlaceInput {
    latitude: Float
    longitude: Float
    name: String
    rating: Float
    user_ratings_total: Int
    weekday_text: [String]
    open_now: Boolean
    description: String
    formatted_address: String
    international_phone_number: String
    imgArr: [String]
    url: String
    review: String
    notes: String
  }
  input UserInput {
    firstName: String
    lastName: String
    username: String
    email: String
    password: String
    birthday: String
  }
  input ChatInput {
    name: String
    admin: ID
    members: [ID]
  }
  input MessageInput {
    description: String!
    author: ID!
    content: String
    timeslots: [String]
    photo: String
  }
  type Query {
    getBuckets(userId: ID!): [Bucket]
    getBucketById(bucketId: ID!): Bucket
    getChats(userId: ID!): [Chat]
    getChatById(chatId: ID!): Chat
    getUserById(userId: ID!): User
    getUserByUsername(username: String): User
  }
  type Mutation {
    createBucket(input: BucketInput!, place: PlaceInput, userId: ID!): Bucket
    addUserToBucket(bucketId: ID!, userId: ID!): Bucket
    addCategory(bucketId: ID!, label: String): Category
    addPlace(catId: ID!, input: PlaceInput!): Place
    changeBucketName(bucketId: ID!, title: String): Bucket
    changeCatName(bucketId: ID!, catId: ID!, label: String): Category
    changePlaceName(
      bucketId: ID!
      catId: ID!
      placeId: ID!
      name: String
    ): Place
    editBucketNotes(bucketId: ID!, newNote: String): Bucket
    editPlaceNotes(
      bucketId: ID!
      catId: ID!
      placeId: ID!
      newNote: String
    ): Place
    deleteBucket(bucketId: ID!): Bucket
    deleteCategory(bucketId: ID!, catId: ID!): Bucket
    deletePlace(bucketId: ID!, catId: ID!, placeId: ID!): Bucket
    registerUser(input: UserInput!): User
    loginUser(input: UserInput!): User
    addInfoToUser(
      userId: ID!
      location: String
      vibe: String
      emojis: String
    ): User
    addProfilePicToUser(userId: ID!, profile_pic: String): User
    addFriendToUser(userId: ID!, friendId: ID!): [User]
    removeFriendFromUser(userId: ID!, friendId: ID!): [User]
    createChat(input: ChatInput): Chat
    postMessageToChat(chatId: ID!, input: MessageInput): Chat
  }
  type Subscription {
    messageSent(author: ID!, chatId: ID): Message
  }
`;

module.exports = typeDefs;
