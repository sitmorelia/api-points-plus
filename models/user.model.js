import { db } from "../database/connection.database.js";

const create = async ({ email, password, username, role_id, created_by }) => {
  const query = {
    text: `
        INSERT INTO users (email, password, username, role_id, created_date, modified_date, created_by)
        VALUES ($1, $2, $3, $4, NOW(), NOW(), $5)
        RETURNING email, username, uid, role_id
        `,
    values: [email, password, username, role_id, created_by],
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const findOneByEmail = async (email) => {
  const query = {
    text: `
        SELECT * FROM users
        WHERE EMAIL = $1
        `,
    values: [email],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const findAll = async () => {
  const query = {
    text: `
        SELECT * FROM users
        `,
  };
  const { rows } = await db.query(query);
  return rows;
};

const findOneByUid = async (uid) => {
  const query = {
    text: `
        SELECT * FROM users
        WHERE uid = $1
        `,
    values: [uid],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

export const UserModel = {
  create,
  findOneByEmail,
  findAll,
  findOneByUid,
};
