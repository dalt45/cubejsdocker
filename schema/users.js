cube(`Users`, {
  sql: `SELECT * FROM users`,
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
    createdAt: {
      sql: `created_at`,
      type: `time`,
    },
    isLoggedIn: {
      sql: `is_logged_in`,
      type: `boolean`,
    },
  },
});
