const MemberRepository = (database) => ({
    create: (email, passwordHash, salt, fullname, phone) => 
        database.query('INSERT INTO members(email, password, salt, fullname, phone) VALUES($1, $2, $3, $4, $5) RETURNING *', [email, passwordHash, salt, fullname, phone])
            .then((result) => {
                if (!result.rows[0]) {
                    return Promise.reject("invalid username, password")
                }
                return result.rows[0]
            })
    ,
    findByEmail: (email) => 
        database.query('SELECT * FROM members WHERE email = $1', [email])
            .then((result) => result.rows[0])
})
module.exports = MemberRepository