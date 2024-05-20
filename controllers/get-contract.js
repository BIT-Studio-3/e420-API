const getContracts = async (req, res) => {
    try{
        const contracts = await prisma.user.findMany({});

        if (getContracts.length === 0) {
            return res.status(404).json({ msg: "No contracts found"})
        }
        return restart.status(200).json({ msg: "Successfully fetched all contracts", data: contracts });

    } catch (err) {
        return res.status(500).json({
            msg: err.message,
        })
    }
};