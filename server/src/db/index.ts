import pg from "pg";

export const db = new pg.Pool();

export const INIT_TABLES = /* sql */ `
    CREATE TABLE IF NOT EXISTS "user" (
        id VARCHAR(128) PRIMARY KEY,
        name VARCHAR(128) UNIQUE NOT NULL,
        email VARCHAR(128),
        wins INTEGER DEFAULT 0,
        losses INTEGER DEFAULT 0,
        draws INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS "game" (
        id SERIAL PRIMARY KEY,
        winner VARCHAR(5),
        end_reason VARCHAR(16),
        pgn TEXT,
        white_id VARCHAR(128) REFERENCES "user",
        white_name VARCHAR(32),
        black_id VARCHAR(128) REFERENCES "user",
        black_name VARCHAR(32),
        started_at TIMESTAMP NOT NULL,
        ended_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;