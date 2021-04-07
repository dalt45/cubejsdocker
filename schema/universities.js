cube(`Universities`, {
  sql: `SELECT * FROM universities`,
  measures: {
    count: {
      type: `count`,
      drillMembers: [id],
    },
  },
  dimensions: {
    id: {
      type: `string`,
      sql: `id`,
      primaryKey: true,
      shown: true,
    },
    country: {
      sql: `country`,
      type: `string`,
    },
    city: {
      sql: `city`,
      type: `string`,
    },
  },
});
