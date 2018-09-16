const MemberRepository = (database) => ({
    create: (email, password, fullname, phone) => 
        database.query('INSERT INTO members(email, password, fullname, phone) VALUES($1, $2, $3, $4) RETURNING *', [email, password, fullname, phone])
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