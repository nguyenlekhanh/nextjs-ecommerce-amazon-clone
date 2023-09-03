import dbConnect from '@/libs/dbConnect';

// class BaseModel {
//   constructor() {
//     initialize();
//   }

//   async initialize() {
//     await dbConnect();
//   }
// }

const BaseModel = {
	db_initialize: async function() {
    await dbConnect();
  },
}