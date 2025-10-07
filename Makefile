laravel-init:
	cp .env.example .env
	php artisan key:generate
	touch database/database.sqlite
	php artisan migrate:fresh --seed
	bun i

dev:
	bunx --bun concurrently -c "#93c5fd,#c4b5fd,#fb7185,#fdba74,#93c5fd" \
	"php artisan serve" \
	"php artisan queue:listen --tries=1" \
	"php artisan pail --timeout=0" \
	"php artisan reverb:start --host=0.0.0.0 --port=8080" \
	"bun run dev" \
	--names=server,queue,logs,reverb,vite --kill-others

dev-ssr:
	bun run build:ssr
	bunx --bun concurrently -c "#93c5fd,#c4b5fd,#fb7185,#fdba74,#93c5fd" \
	"php artisan serve" \
	"php artisan queue:listen --tries=1" \
	"php artisan pail --timeout=0" \
	"php artisan reverb:start --host=0.0.0.0 --port=8080" \
	"php artisan inertia:start-ssr" \
	--names=server,queue,logs,reverb,ssr --kill-others

test:
	php artisan config:clear --ansi
	php artisan test
