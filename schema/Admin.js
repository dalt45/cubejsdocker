cube(`Admin`, {
  sql: `SELECT * FROM backenddb.admin`,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [],
    },
  },

  dimensions: {
    email: {
      sql: `email`,
      type: `string`,
    },

    password: {
      sql: `password`,
      type: `string`,
    },
  },

  dataSource: `default`,
});
