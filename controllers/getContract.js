const getContracts = async (req, res) => {
    try{
        // get all the contracts associated with the user id
        const contracts = await prisma.contract.findMany({
            //query to get user specific contracts
            where: userId === req.params.userId,
        });
        // error handling for finding no contracts
        if (contracts.length === 0) {
            return res.status(404).json({ msg: "No contracts found"})
        }
        return res.status(200).json({ msg: "Successfully fetched all contracts", data: contracts });
    //handles any other errors
    } catch (err) {
        return res.status(500).json({
            msg: err.message,
        })
    }
};