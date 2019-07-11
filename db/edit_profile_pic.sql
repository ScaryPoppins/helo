UPDATE helo_users
SET profile_pic = $2
WHERE users_id = $1;