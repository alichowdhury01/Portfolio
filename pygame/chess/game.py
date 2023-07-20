import pygame
import os
from board import Board

# Load piece images
w_bishop_luigi_w = pygame.image.load(os.path.join('assets', 'luigi.png'))
w_bishop_daisy_b = pygame.image.load(os.path.join('assets', 'daisy.png'))
w_king_mario = pygame.image.load(os.path.join('assets', 'mario.png'))
w_knight_yoshi = pygame.image.load(os.path.join('assets', 'yoshi.png'))
w_pawn_coin = pygame.image.load(os.path.join('assets', 'coin.png'))
w_queen_peach = pygame.image.load(os.path.join('assets', 'peach.png'))
w_rook_toad = pygame.image.load(os.path.join('assets', 'toad.png'))

b_bishop_kamek = pygame.image.load(os.path.join('assets', 'kamek.png'))
b_king_bowser = pygame.image.load(os.path.join('assets', 'bowser.png'))
b_knight_birdo = pygame.image.load(os.path.join('assets', 'birdo.png'))
b_pawn_koopa = pygame.image.load(os.path.join('assets', 'koopa.png'))
b_queen_bowserjr = pygame.image.load(os.path.join('assets', 'bowserjr.png'))
b_rook_goomba = pygame.image.load(os.path.join('assets', 'goomba.png'))

W = [w_rook_toad, w_knight_yoshi, w_bishop_daisy_b, w_queen_peach, w_king_mario, w_bishop_luigi_w, w_knight_yoshi, w_rook_toad]
B = [b_rook_goomba, b_knight_birdo,b_bishop_kamek,   b_queen_bowserjr, b_king_bowser, b_bishop_kamek, b_knight_birdo, b_rook_goomba]


class Game:
    def __init__(self):
        pygame.init()
        self.screen = pygame.display.set_mode((800, 800))
        pygame.display.set_caption("Chess Game")
        self.clock = pygame.time.Clock()
        self.is_running = False
        self.board = Board()  # Initialize the chessboard
        self.selected_piece = None  # Variable to store the selected piece

        # Set the initial positions of the pieces on the board
        self.setup_pieces()

    def setup_pieces(self):
        # Place the white pieces
        self.board.place_piece('w_rook', 0, 0)
        self.board.place_piece('w_knight', 0, 1)
        self.board.place_piece('w_bishop2', 0, 2)
        self.board.place_piece('w_queen', 0, 3)
        self.board.place_piece('w_king', 0, 4)
        self.board.place_piece('w_bishop', 0, 5)
        self.board.place_piece('w_knight', 0, 6)
        self.board.place_piece('w_rook', 0, 7)
        for i in range(8):
            self.board.place_piece('w_pawn', 1, i)

        self.board.place_piece('b_rook', 7, 0)
        self.board.place_piece('b_knight', 7, 1)
        self.board.place_piece('b_bishop', 7, 2)
        self.board.place_piece('b_queen', 7, 3)
        self.board.place_piece('b_king', 7, 4)
        self.board.place_piece('b_bishop', 7, 5)
        self.board.place_piece('b_knight', 7, 6)
        self.board.place_piece('b_rook', 7, 7)
        for i in range(8):
            self.board.place_piece('b_pawn', 6, i)



    def start(self):
        self.is_running = True
        while self.is_running:
            self.handle_events()
            self.update()
            self.draw()
            self.clock.tick(60)  # Limit the frame rate to 60 FPS

        pygame.quit()

    def handle_events(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                self.is_running = False
            elif event.type == pygame.MOUSEBUTTONDOWN:

                if event.button == 1:  # Left mouse button clicked
                    row, col = event.pos[1] // self.board.tile_size, event.pos[0] // self.board.tile_size
                    if self.selected_piece is None:
                        self.selected_piece = (row, col)
                        print(f"Selected piece: {self.selected_piece}")
                        # print(self.selected_piece)
                    else:
                        self.board.move_piece(self.selected_piece[0], self.selected_piece[1], row, col)
                        self.selected_piece = None
                        print(self.selected_piece)

    def update(self):
        # Game logic updates here (e.g., check for checkmate, update pieces, etc.)
        pass

    def draw(self):
        self.screen.fill((255, 255, 255))  # Fill the screen with white color
        self.board.draw(self.screen)  # Draw the chessboard

        # Draw the pieces on the board based on their positions
        for row in range(self.board.board_size):
            for col in range(self.board.board_size):
                piece = self.board.get_piece(row, col)
                if piece == 'w_rook':
                    self.screen.blit(W[0], self.board.get_tile_coordinates(row, col))
                elif piece == 'w_knight':
                    self.screen.blit(W[1], self.board.get_tile_coordinates(row, col))
                elif piece == 'w_bishop':
                    self.screen.blit(W[5], self.board.get_tile_coordinates(row, col))
                elif piece == 'w_queen':
                    self.screen.blit(W[3], self.board.get_tile_coordinates(row, col))
                elif piece == 'w_king':
                    self.screen.blit(W[4], self.board.get_tile_coordinates(row, col))
                elif piece == 'w_bishop2':
                    self.screen.blit(W[2], self.board.get_tile_coordinates(row, col))
                elif piece == 'w_knight':
                    self.screen.blit(W[6], self.board.get_tile_coordinates(row, col))
                elif piece == 'w_pawn':
                    self.screen.blit(w_pawn_coin, self.board.get_tile_coordinates(row, col))


                elif piece == 'b_rook':
                    self.screen.blit(B[0], self.board.get_tile_coordinates(row, col))
                elif piece == 'b_knight':
                    self.screen.blit(B[1], self.board.get_tile_coordinates(row, col))
                elif piece == 'b_bishop':
                    self.screen.blit(B[2], self.board.get_tile_coordinates(row, col))
                elif piece == 'b_queen':
                    self.screen.blit(B[3], self.board.get_tile_coordinates(row, col))
                elif piece == 'b_king':
                    self.screen.blit(B[4], self.board.get_tile_coordinates(row, col))
                elif piece == 'b_bishop':
                    self.screen.blit(B[5], self.board.get_tile_coordinates(row, col))
                elif piece == 'b_knight':
                    self.screen.blit(B[6], self.board.get_tile_coordinates(row, col))
                elif piece == 'b_rook':
                    self.screen.blit(B[7], self.board.get_tile_coordinates(row, col))
                elif piece == 'b_pawn':
                    self.screen.blit(b_pawn_koopa, self.board.get_tile_coordinates(row, col))

        pygame.display.flip()  # Update the display


if __name__ == "__main__":
    game = Game()
    game.start()
