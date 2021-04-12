cube(`StudentApplicationProgramContentfeaturedinformation`, {
  sql: `SELECT * FROM mongodb.\`student_application_program_contentFeaturedInformation\``,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [],
    },
  },

  dimensions: {
    programContentfeaturedinformationTextparagraph: {
      sql: `${CUBE}.\`program.contentFeaturedInformation.textParagraph\``,
      type: `string`,
      title: `Program.contentfeaturedinformation.textparagraph`,
    },

    programContentfeaturedinformationUrlimage: {
      sql: `${CUBE}.\`program.contentFeaturedInformation.urlImage\``,
      type: `string`,
      title: `Program.contentfeaturedinformation.urlimage`,
    },
  },

  dataSource: `default`,
});
