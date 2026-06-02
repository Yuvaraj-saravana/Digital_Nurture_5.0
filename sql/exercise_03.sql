-- Exercise 3: Inactive Users
-- Retrieve users who have not registered for any events in the last 90 days.
SELECT user_id, full_name
FROM Users
WHERE user_id NOT IN (
    SELECT user_id 
    FROM Registrations
    WHERE registration_date >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
);

