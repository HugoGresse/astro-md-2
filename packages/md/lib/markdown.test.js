import { describe, it, expect } from 'vitest'
import { HTMLString } from 'astro/runtime/server/index.js'
import { markdown } from './markdown.js'

describe('markdown()', () => {
	it('renders a heading', async () => {
		const result = await markdown('# Hello')
		expect(result.toString()).toContain('<h1')
		expect(result.toString()).toContain('Hello')
	})

	it('renders bold text', async () => {
		const result = await markdown('**bold**')
		expect(result.toString()).toContain('<strong>bold</strong>')
	})

	it('renders italic text', async () => {
		const result = await markdown('_italic_')
		expect(result.toString()).toContain('<em>italic</em>')
	})

	it('returns an HTMLString instance', async () => {
		const result = await markdown('hello')
		expect(result).toBeInstanceOf(HTMLString)
		expect(result).toBeInstanceOf(String)
	})

	it('wraps block content in a paragraph', async () => {
		const result = await markdown('hello world')
		expect(result.toString()).toMatch(/^<p>hello world<\/p>/)
	})
})

describe('markdown.inline()', () => {
	it('strips surrounding <p> tags from a single paragraph', async () => {
		const result = await markdown.inline('hello _world_')
		const html = result.toString()
		expect(html).not.toMatch(/^<p>/)
		expect(html).not.toMatch(/<\/p>$/)
		expect(html).toContain('<em>world</em>')
	})

	it('renders bold text without paragraph wrapper', async () => {
		const result = await markdown.inline('**bold**')
		const html = result.toString()
		expect(html).toContain('<strong>bold</strong>')
		expect(html).not.toMatch(/^<p>/)
	})

	it('returns an HTMLString instance', async () => {
		const result = await markdown.inline('hello')
		expect(result).toBeInstanceOf(HTMLString)
		expect(result).toBeInstanceOf(String)
	})

	it('preserves multi-paragraph content as-is', async () => {
		const result = await markdown.inline('para one\n\npara two')
		const html = result.toString()
		expect(html).toContain('<p>')
	})
})
