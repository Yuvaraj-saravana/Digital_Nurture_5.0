-- Exercise 16: Unregistered Active Users
-- Find users who created an account in the last 30 days but haven’t registered for any events.
SELECT user_id, full_name
FROM Users
WHERE registration_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
  AND user_id NOT IN (SELECT user_id FROM Registrations);

