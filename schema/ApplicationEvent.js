cube(`ApplicationEvent`, {
  sql: `SELECT * FROM mongodb.application_event`,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [],
    },
  },

  dimensions: {
    event: {
      sql: `event`,
      type: `string`,
    },

    eventKey: {
      sql: `eventKey`,
      type: `string`,
    },
    value: {
      sql: `value`,
      type: `string`,
    },
  },

  dataSource: `default`,
});
