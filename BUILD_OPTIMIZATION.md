# Build Optimization Guide

## Current Build Optimizations

The build process has been optimized for faster deployment on Render:

### npm Install Optimizations
- `--prefer-offline`: Uses cached packages when available
- `--no-audit`: Skips security audit (faster installs)
- `--no-fund`: Skips funding messages (cleaner output)

### Angular Build Optimizations
- Production builds use full optimization
- Source maps disabled for production (faster builds)
- License extraction enabled

## If Builds Are Still Slow

### Option 1: Use Development Build (Faster, Less Optimized)
In `render.yaml`, change the build command to:
```yaml
buildCommand: npm install --prefer-offline --no-audit --no-fund && npm run build:fast
```

**Note:** This will create a larger bundle size but builds much faster.

### Option 2: Check Render Dashboard
1. Go to your service in Render dashboard
2. Check the "Logs" tab to see where it's spending time
3. Look for:
   - npm install taking too long
   - Angular build compilation
   - Asset processing

### Option 3: Reduce Build Timeout
If builds are timing out:
- Check Render's build timeout settings
- Consider upgrading to a paid plan for faster builds
- Split the build into multiple steps if needed

### Option 4: Enable Build Caching
Render automatically caches `node_modules` between builds if:
- `package.json` and `package-lock.json` haven't changed
- The build succeeds

## Monitoring Build Performance

To see build times:
1. Go to Render dashboard → Your Service → Deploys
2. Click on a deploy to see timing breakdown
3. Look for:
   - Install time
   - Build time
   - Deploy time

## Troubleshooting

### Build Stuck on "npm install"
- Check if `package-lock.json` is committed
- Verify all dependencies are available
- Check Render's network connectivity

### Build Stuck on "ng build"
- Check Angular build logs in Render
- Verify TypeScript compilation isn't hanging
- Check for circular dependencies

### Build Completes But Site Not Updating
- Check if the start command is correct
- Verify the output path matches `dist/ftask/browser`
- Check service logs for runtime errors

