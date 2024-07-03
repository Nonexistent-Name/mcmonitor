async function isMinecraftServerRunning() {
	try {
		return (await Bun.$`systemctl is-active minecraft-bedrock`.text()) === 'active';
	} catch {
		return false;
	}
}

async function getServiceUptimeStr(service: string) {
	// Must use Bun.$ syntax instead of importing $ from 'bun'
	const str = (await Bun.$`systemctl show --property=ActiveEnterTimestamp ${service}`.text())
		.replace('ActiveEnterTimestamp=', '')
		.trimEnd();

	if (str === 'n/a') return '';

	return new Date(Date.now() - new Date(str).getTime()).toISOString().substring(11, 19);
}

export async function load() {
	return {
		uptime: new Date(parseFloat((await Bun.file('/proc/uptime').text()).split(' ')[0]) * 1000)
			.toISOString()
			.substring(11, 19),
		statuspageUptime: await getServiceUptimeStr('mc-statuspage'),
		minecraftRunning: await isMinecraftServerRunning(),
		minecraftUptime: await getServiceUptimeStr('minecraft-bedrock')
	};
}
