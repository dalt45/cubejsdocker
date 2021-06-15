cube(`UniversityCampusFields`, {
  sql: `SELECT * FROM backenddb.university_campus_fields`,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [campusFieldsId, campusFieldsCreatedby, campusFieldsName],
    },
  },

  dimensions: {
    campusFieldsId: {
      sql: `${CUBE}.\`campus.fields._id\``,
      type: `string`,
      title: `Campus.fields. Id`,
    },

    campusFieldsCreatedby: {
      sql: `${CUBE}.\`campus.fields.createdBy\``,
      type: `string`,
      title: `Campus.fields.createdby`,
    },

    campusFieldsName: {
      sql: `${CUBE}.\`campus.fields.name\``,
      type: `string`,
      title: `Campus.fields.name`,
    },
  },

  dataSource: `default`,
});
