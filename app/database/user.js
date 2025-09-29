import { db } from "./db.js";

/**
 * Creates a new user in the database.
 *
 * @param {Object} userData - The data of the user to be created.
 * @param {string} userData.name - The name of the user.
 * @param {string} userData.password - The password of the user.
 * @param {string} userData.email - The email of the user.
 * @returns {Promise<Object>} A promise that resolves to the created user object,
 * including the generated ID, or rejects with an error if the operation fails.
 */

const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
    );
    stmt.run(
      [userData.name, userData.email, userData.password],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...userData });
        }
      }
    );
    stmt.finalize();
  });
};

/**
 * Updates an existing user in the database.
 *
 * @param {number} id - The ID of the user to be updated.
 * @param {Object} userData - The new data for the user.
 * @param {string} userData.name - The updated name of the user.
 * @param {string} userData.email - The updated email of the user.
 * @param {string} userData.password - The updated password of the user.
 * @returns {Promise<Object>} A promise that resolves to the updated user object,
 * including the ID, or rejects with an error if the operation fails.
 */
const updateUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?"
    );
    stmt.run(
      [userData.name, userData.email, userData.password, id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: id, ...userData });
        }
      }
    );
    stmt.finalize();
  });
};

/**
 * Retrieves a user from the database by their ID.
 *
 * @param {number} id - The ID of the user to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the user object,
 * or null if no user is found, or rejects with an error if the operation fails.
 */
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
    stmt.get([id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row || null);
      }
    });
    stmt.finalize();
  });
};

/**
 * Retrieves all users from the database.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of user objects,
 * or rejects with an error if the operation fails.
 */
const getUsers = () => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("SELECT * FROM users");
    stmt.all((err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
    stmt.finalize();
  });
};

/**
 * Deletes a user from the database by their ID.
 *
 * @param {number} id - The ID of the user to delete.
 * @returns {Promise<void>} A promise that resolves if the user is deleted,
 * or rejects with an error if the operation fails.
 */
const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("DELETE FROM users WHERE id = ?");
    stmt.run([id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
    stmt.finalize();
  });
};

export { getUserById, getUsers, deleteUser, createUser, updateUser };