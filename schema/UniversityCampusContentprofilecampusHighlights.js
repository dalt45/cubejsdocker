cube(`UniversityCampusContentprofilecampusHighlights`, {
  sql: `SELECT * FROM backenddb.\`university_campus_contentProfileCampus_highlights\``,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [],
    },
  },

  dimensions: {
    campusContentprofilecampusHighlightsText: {
      sql: `${CUBE}.\`campus.contentProfileCampus.highlights.text\``,
      type: `string`,
      title: `Campus.contentprofilecampus.highlights.text`,
    },
  },

  dataSource: `default`,
});
