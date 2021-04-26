cube(`University`, {
  sql: `SELECT * FROM mongodb.university`,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [createdby, name],
    },
  },

  dimensions: {
    createdby: {
      sql: `${CUBE}.\`createdBy\``,
      type: `string`,
    },

    name: {
      sql: `name`,
      type: `string`,
    },
  },

  dataSource: `default`,
});
