const sessionModel = require("../models/session");

const sessionService = {};
sessionService.createSession = async (session) => {
  return await new sessionModel(session).save();
};
sessionService.findOneSession = async (searchQuery, projectionQuery) => {
  console.log("searchQuery==>", searchQuery);
  return await sessionModel.findOne({ searchQuery, projectionQuery });
};

sessionService.deleteOneToken = async (searchQuery) => {
  return await sessionModel.deleteOne(searchQuery);
};

module.exports = sessionService;
