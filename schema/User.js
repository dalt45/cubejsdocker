cube(`User`, {
  sql: `SELECT * FROM mongodb.user`,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [],
    },
  },

  dimensions: {
    confirmationcode: {
      sql: `${CUBE}.\`confirmationCode\``,
      type: `string`,
    },

    email: {
      sql: `email`,
      type: `string`,
    },

    password: {
      sql: `password`,
      type: `string`,
    },

    status: {
      sql: `status`,
      type: `string`,
    },

    type: {
      sql: `type`,
      type: `string`,
    },

    university: {
      sql: `university`,
      type: `string`,
    },
    lastLogged: {
      sql: `lastLogged`,
      type: `time`,
    },
  },

  dataSource: `default`,
});
