.PHONY: build test test-visual clean help dev

help:
	@echo "Available commands:"
	@echo "  make dev             - Start development server"
	@echo "  make build           - Build for production"
	@echo "  make test            - Run visual regression tests (same as test-visual)"
	@echo "  make test-visual     - Run visual regression tests"
	@echo "  make clean           - Clean build artifacts"
	@echo ""
	@echo "Quick start:"
	@echo "  make dev             - Start developing"
	@echo "  make test            - Verify before pushing"

dev:
	@echo "🚀 Starting development server..."
	npm run dev

build:
	@echo "🏗️  Building for production..."
	npm run build

test: test-visual
	@echo ""
	@echo "✅ All tests passed!"

test-visual:
	@echo "📸 Running visual regression tests..."
	npm run test:visual

clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf dist build .astro
	@echo "✅ Cleanup complete"
