SELECT p.*, u.username FROM helo_posts p
JOIN helo_users u
on u.users_id = p.author_id