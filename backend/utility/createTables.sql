CREATE TABLE IF NOT EXISTS user(
    id VARCHAR(80) PRIMARY KEY,
    handle VARCHAR(30) NOT NULL UNIQUE,
    email_id VARCHAR(50) UNIQUE,
    phone BIGINT(10) UNIQUE,
    bio VARCHAR(150),
    is_verfied BOOLEAN DEFAULT false,
    is_public BOOLEAN DEFAULT true,
    p_img_url VARCHAR(255) 
);

CREATE TABLE IF NOT EXISTS user_follower(
    user_id VARCHAR(80) NOT NULL,
    follower_id VARCHAR(80) NOT NULL,
    is_pending BOOLEAN DEFAULT true,
    INDEX (user_id)
);

CREATE TABLE IF NOT EXISTS post(
    id VARCHAR(80) PRIMARY KEY,
    img_url VARCHAR(512) NOT NULL,
    user_id VARCHAR(80) NOT NULL,
    created_at DATETIME,
    descp VARCHAR(200),   
    INDEX (user_id)
);