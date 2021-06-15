cube(`StudentApplicationStudies`, {
  sql: `SELECT * FROM backenddb.student_application_studies`,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [],
    },
  },

  dimensions: {
    studiesArea: {
      sql: `${CUBE}.\`studies.area\``,
      type: `string`,
      title: `Studies.area`,
    },

    studiesGrade: {
      sql: `${CUBE}.\`studies.grade\``,
      type: `string`,
      title: `Studies.grade`,
    },

    studiesInstitution: {
      sql: `${CUBE}.\`studies.institution\``,
      type: `string`,
      title: `Studies.institution`,
    },

    studiesScore: {
      sql: `${CUBE}.\`studies.score\``,
      type: `string`,
      title: `Studies.score`,
    },

    studiesScoretype: {
      sql: `${CUBE}.\`studies.scoreType\``,
      type: `string`,
      title: `Studies.scoretype`,
    },
  },

  dataSource: `default`,
});
