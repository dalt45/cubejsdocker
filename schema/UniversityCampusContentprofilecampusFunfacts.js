cube(`UniversityCampusContentprofilecampusFunfacts`, {
  sql: `SELECT * FROM backenddb.\`university_campus_contentProfileCampus_funfacts\``,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [],
    },
  },

  dimensions: {
    campusContentprofilecampusFunfactsText: {
      sql: `${CUBE}.\`campus.contentProfileCampus.funfacts.text\``,
      type: `string`,
      title: `Campus.contentprofilecampus.funfacts.text`,
    },
  },

  dataSource: `default`,
});
