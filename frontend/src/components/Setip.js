const Setip = () => {
    return (
        <div className="ipContainer">
            <div className="inpCon">
                <input type="text" placeholder="xxx.xxx.xxx.xxx" minlength="7" maxlength="15" size="15" pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$" />
            </div>
            <div className="btnCon">
                <button className="btn setIp">Set IP</button>
            </div>
        </div>
    )
}

export default Setip
