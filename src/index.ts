import { Command, flags } from '@oclif/command'
import { SimpleFastPrefixCompletions } from 'simple-fast-prefix-completions'

async function read(stream: NodeJS.ReadStream) {
  const chunks: Uint8Array[] = []
  for await (const chunk of stream) chunks.push(chunk as Uint8Array)
  return Buffer.concat(chunks).toString('utf8')
}

class SimpleFastPrefixCompletionsCli extends Command {
  static description = 'a cli to generate the datastructures for simple-fast-prefix-completions';

  static examples= ['cat {{words.json}} | sfpc --words > result.json', 'cat {{rankedWordsWithIds.json}} | sfpc --words > result.json']

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    words: flags.boolean({description: 'indicate that stdin is a json stringified array of strings ["sally", "sells", "seashells"]', exclusive: [
      'wordsWithIds', 'rankedWords', 'rankedWordsWithIds',
    ]}),
    wordsWithIds: flags.boolean({description: 'indicate that stdin is a json stringified array of string, id tuples [["sally", 50], ["sells", 30], ["seashells", 25]]', exclusive: [
      'words', 'rankedWords', 'rankedWordsWithIds',
    ]}),
    rankedWords: flags.boolean({description: 'indicate that stdin is a json stringified array of string, number tuples [["sally", 0], ["sells", 1], ["seashells", 2]]', exclusive: [
      'words', 'wordsWithIds', 'rankedWordsWithIds',
    ]}),
    rankedWordsWithIds: flags.boolean({description: 'indicate that stdin is a json stringified array of string, number, id tuples [["sally", 0, 50], ["sells", 1, 30], ["seashells", 2, 25]]', exclusive: [
      'words', 'wordsWithIds', 'rankedWords',
    ]}),
    separator: flags.string({description: 'the separator for the words. Defaults to "\\u0001". Must have length 1.'}),
  };

  static args = [{name: 'file'}];

  async run() {
    const {flags} = this.parse(SimpleFastPrefixCompletionsCli)

    const options: ConstructorParameters<typeof SimpleFastPrefixCompletions>[0] = {

    }

    if (flags.separator !== undefined) {
      options.SEPARATOR = flags.separator
    }

    const stdin = await read(process.stdin)

    if (stdin.length === 0) {
      this.error('Must pass data with stdin')
    }

    let parsedStdin: any

    try {
      parsedStdin = JSON.parse(stdin)
    } catch (error) {
      this.error('Failed to json parse stdin')
    }

    if (flags.words) {
      options.words = parsedStdin
    } else if (flags.wordsWithIds) {
      options.wordsWithIds = parsedStdin
    } else if (flags.rankedWords) {
      options.rankedWords = parsedStdin
    } else if (flags.rankedWordsWithIds) {
      options.rankedWordsWithIds = parsedStdin
    } else {
      this.error('Must indicate with a flag that stdin is either words, wordsWithIds, rankedWords, or rankedWordsWithIds')
    }

    const completions = new SimpleFastPrefixCompletions(options)

    process.stdout.write(completions.toJSON())
  }
}

export = SimpleFastPrefixCompletionsCli;
