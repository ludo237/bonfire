dev:
	php artisan serve & \
	php artisan queue:listen --tries=1 & \
	php artisan pail --timeout=0 & \
	php artisan reverb:start --host="0.0.0.0" --port=8080 & \
	bun run dev

dev-ssr:
	bun run build:ssr
	php artisan serve & \
	php artisan queue:listen --tries=1 & \
	php artisan pail --timeout=0 & \
	php artisan reverb:start --host="0.0.0.0" --port=8080 & \
	php artisan inertia:start
